/**
 * Getting a captured photo into the user's actual photo library, and keeping
 * the app's own copies from being evicted.
 *
 * The platform reality, which the UI has to be honest about:
 *  - Android Chrome launches the camera app, which normally saves a copy to the
 *    gallery, so Google Photos backs it up already.
 *  - iOS Safari hands the image straight to the page and saves nothing. Every
 *    iOS browser is WebKit, so Chrome and Firefox for iPhone behave the same.
 *  - The only programmatic route into Photos is the share sheet's "Save Image".
 *    It cannot be automated: iOS deliberately walls the photo library off from
 *    the web, and a `download` link goes to Files, not Photos.
 */

export interface SaveCapability {
	/** worth offering the button at all */
	offer: boolean;
	/** iOS, so the copy really is missing from their library */
	ios: boolean;
}

/** Pure so the decision can be tested without a phone. */
export function saveCapability(opts: {
	ua: string;
	maxTouchPoints: number;
	canShareFiles: boolean;
}): SaveCapability {
	const ios =
		/iphone|ipad|ipod/i.test(opts.ua) ||
		(/Macintosh/.test(opts.ua) && opts.maxTouchPoints > 1);
	// Android has usually saved a copy already, so the button would be noise
	return { offer: ios && opts.canShareFiles, ios };
}

export function detectSaveCapability(): SaveCapability {
	if (typeof navigator === 'undefined') return { offer: false, ios: false };
	let canShareFiles = false;
	try {
		const probe = new File([new Uint8Array([0])], 'probe.jpg', { type: 'image/jpeg' });
		canShareFiles = Boolean(navigator.canShare?.({ files: [probe] }));
	} catch {
		canShareFiles = false;
	}
	return saveCapability({
		ua: navigator.userAgent,
		maxTouchPoints: navigator.maxTouchPoints ?? 0,
		canShareFiles
	});
}

export type SaveOutcome = 'shared' | 'cancelled' | 'unsupported' | 'failed';

/**
 * Opens the share sheet so the user can tap "Save Image".
 *
 * Must be called straight from the click handler with the blob already in hand —
 * WebKit revokes transient activation if you await anything slow first, and the
 * share then throws NotAllowedError.
 */
export async function saveToPhotos(blob: Blob, filename = 'meet-a-tree.jpg'): Promise<SaveOutcome> {
	if (!navigator.share) return 'unsupported';
	const type = blob.type === 'image/png' ? 'image/png' : 'image/jpeg';
	const name = type === 'image/png' ? filename.replace(/\.jpe?g$/i, '.png') : filename;
	const file = new File([blob], name, { type });
	if (!navigator.canShare?.({ files: [file] })) return 'unsupported';
	try {
		await navigator.share({ files: [file] });
		return 'shared';
	} catch (err) {
		return (err as DOMException)?.name === 'AbortError' ? 'cancelled' : 'failed';
	}
}

/**
 * Ask the browser to treat this site's storage as persistent, so the app's
 * photos aren't evicted when the device is short of space. Chrome grants it
 * silently for installed or well-used sites; Safari treats installed PWAs more
 * generously than tabs. Cheap to ask, and it only ever helps.
 */
export async function requestPersistence(): Promise<boolean> {
	try {
		if (!navigator.storage?.persist) return false;
		if (await navigator.storage.persisted?.()) return true;
		return await navigator.storage.persist();
	} catch {
		return false;
	}
}

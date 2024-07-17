import type { HomePageTheme, HomePageThemeBase, ColorScheme } from "../env";
import { getPhotoByName } from "./photoHelper";
import { HomePageDarkColorThemes, HomePageLightColorThemes, DefaultThemeScheme } from "./themeConsts";

export function getHomePageThemes(): { light: HomePageTheme[], dark: HomePageTheme[] } {
	return {
		light: HomePageLightColorThemes.map(extendTheme),
		dark: HomePageDarkColorThemes.map(extendTheme),
	};
}

function extendTheme(theme: HomePageThemeBase): HomePageTheme {
	const photo = getPhotoByName(theme.photoName);
	return {
		...theme,
		imgJustify: theme.titleAlign == "left" ? "flex-end" : "flex-start",
		src: photo.paths.large,
		caption: photo.joinedCaption,
		ratio: photo.ratio,
	};
}

export function applyColorSchemeDefaults(scheme: ColorScheme = {}, defaults: ColorScheme = DefaultThemeScheme): ColorScheme {

	scheme.text ??= defaults.text;
	scheme.background ??= defaults.background;
	scheme.accent ??= defaults.accent;
	return scheme;
}

export function staticThemeFromScheme(scheme: ColorScheme): HomePageTheme {
	return {
		...applyColorSchemeDefaults(scheme),
		name: 'static',
		photoName: null,
		titleAlign: 'left',
		imgJustify: 'flex-end',
		src: null,
		caption: '',
		ratio: 1,
	}
}
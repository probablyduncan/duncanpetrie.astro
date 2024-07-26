import type { HomePageTheme, HomePageThemeBase, ColorScheme, GenericTheme, IndexTheme } from "../env";
import { getPhotoByName } from "./photoHelper";
import { HomePageDarkColorThemes, HomePageLightColorThemes, DefaultThemeScheme, PhotographyIndexThemes } from "./themeConsts";

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


export function getGenericHomePageThemes() {
	return HomePageLightColorThemes.map(genericThemeFromHomePageTheme);
}

export function getGenericPhotographyIndexThemes() {
	return PhotographyIndexThemes.map(genericThemeFromPhotographyIndexTheme)
}

function genericThemeFromHomePageTheme(theme: HomePageThemeBase): GenericTheme {
	const photo = getPhotoByName(theme.photoName);
	return {
		cssVariables: {
			"title-align": theme.titleAlign,
			"img-justify": theme.titleAlign == "left" ? "flex-end" : "flex-start",
			"img-ratio": photo.ratio,
			"title-is-left": theme.titleAlign == "left" ? 1 : 0,
			"color-text": theme.text ?? DefaultThemeScheme.text,
			"color-background": theme.background ?? DefaultThemeScheme.background,
			"color-accent": theme.accent ?? DefaultThemeScheme.accent,
		},
		elementAttributes: {
			"img[data-theme-element]": {
				src: photo.paths.large,
				alt: photo.joinedCaption,
			},
			"span[data-theme-element]": {
				innerHTML: photo.joinedCaption,
			}
		}
	}
}

function genericThemeFromPhotographyIndexTheme(theme: IndexTheme): GenericTheme {
	const photo = getPhotoByName(theme.photoName);
	return {
		cssVariables: {
			"img-ratio": photo.ratio,
			"over-image-color": theme.textColor,
		},
		elementAttributes: {
			"img[data-theme-element]": {
				src: photo.paths.large,
				alt: photo.joinedCaption,
			},
		}
	}
}
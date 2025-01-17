import { useState, useRef, useEffect } from 'react';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';

import clsx from 'clsx';
import style from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState(articleState.fontFamilyOption);
	const [fontSize, setFontSize] = useState(articleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(articleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		articleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(articleState.contentWidth);

	const sidebarRef = useRef<HTMLDivElement>(null);

	const toggleSidebar = () => {
		setIsOpen((prev) => !prev);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newState = {
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		};
		setArticleState(newState);
	};

	const handleReset = () => {
		const resetState = {
			fontFamilyOption: fontFamilyOptions[0],
			fontSizeOption: fontSizeOptions[0],
			fontColor: fontColors[0],
			backgroundColor: backgroundColors[0],
			contentWidth: contentWidthArr[0],
		};
		setArticleState(resetState);
		setFontFamily(resetState.fontFamilyOption);
		setFontSize(resetState.fontSizeOption);
		setFontColor(resetState.fontColor);
		setBackgroundColor(resetState.backgroundColor);
		setContentWidth(resetState.contentWidth);
	};

	const handleClickOutside = (e: MouseEvent) => {
		if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
			setIsOpen(false);
		}
	};

	const handleClickEsc = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			document.addEventListener('keydown', handleClickEsc);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleClickEsc);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleClickEsc);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				ref={sidebarRef}
				className={clsx(style.container, { [style.container_open]: isOpen })}>
				<form
					className={style.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<div>
						<Select
							selected={fontFamily}
							options={fontFamilyOptions}
							onChange={setFontFamily}
							placeholder='Выберите шрифт'
							title='Шрифт'
						/>
						<Select
							selected={fontSize}
							options={fontSizeOptions}
							onChange={setFontSize}
							placeholder='Выберите размер шрифта'
							title='Размер шрифта'
						/>
						<Select
							selected={fontColor}
							options={fontColors}
							onChange={setFontColor}
							placeholder='Выберите цвет шрифта'
							title='Цвет шрифта'
						/>
						<Select
							selected={backgroundColor}
							options={backgroundColors}
							onChange={setBackgroundColor}
							placeholder='Выберите цвет фона'
							title='Цвет фона'
						/>
						<Select
							selected={contentWidth}
							options={contentWidthArr}
							onChange={setContentWidth}
							placeholder='Выберите ширину контента'
							title='Ширина контента'
						/>
					</div>
					<div className={style.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

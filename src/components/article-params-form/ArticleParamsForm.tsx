import { useState } from 'react';

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
	updateArticleState: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	updateArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState(articleState.fontFamilyOption);
	const [fontSize, setFontSize] = useState(articleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(articleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		articleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(articleState.contentWidth);

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
		updateArticleState(newState);
	};

	const handleReset = () => {
		const resetState = {
			fontFamilyOption: fontFamilyOptions[0],
			fontSizeOption: fontSizeOptions[0],
			fontColor: fontColors[0],
			backgroundColor: backgroundColors[0],
			contentWidth: contentWidthArr[0],
		};
		updateArticleState(resetState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
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

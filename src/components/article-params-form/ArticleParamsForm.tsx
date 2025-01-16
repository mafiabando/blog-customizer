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
import styles from './ArticleParamsForm.module.scss';

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

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
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
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

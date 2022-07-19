import { FC, Fragment } from 'react';

import cx from 'classnames';

import LayoutContainer from 'components/layout-container';

import { DescriptionProps } from './types';

export const Description: FC<DescriptionProps> = ({
  title,
  descriptions,
  leftTexts,
  rightText,
  page,
}) => {
  return (
    <>
      <LayoutContainer className="bg-background-light">
        <div className="mb-10 lg:pt-8">
          <h1 className="font-serif text-3xl font-bold lg:text-6xl text-green-dark">{title}</h1>
        </div>
        <div className="mt-8 lg:mt-0 lg:flex lg:flex-col lg:gap-y-10 pb-15 lg:pb-0">
          <div className="mb-8 lg:flex lg:gap-80 lg:mb-0">
            <p className="flex-1">{descriptions?.[0]}</p>
            <div className="flex-1"></div>
          </div>
          <div className="lg:flex lg:gap-x-80">
            <div className="flex-1"></div>
            <p className="flex-1">{descriptions?.[1]}</p>
          </div>
        </div>
      </LayoutContainer>

      <LayoutContainer className="mt-5 md:mt-32">
        <div className="flex flex-col mdpy-14 md:grid md:grid-cols-2">
          <div className="flex flex-col justify-center order-2 p-6 pb-10 overflow-hidden text-white md:py-10 md:order-1 md:-mt-28 rounded-b-2xl md:rounded-3xl md:rounded-br-none bg-green-dark md:px-14">
            {leftTexts.map((text) => (
              <Fragment key={text.id}>
                <div className="font-serif text-3xl font-semibold lg:text-4xl xl:text-5xl">
                  {text.title}
                </div>
                <p className="mt-4 mb-6">{text.description}</p>
              </Fragment>
            ))}
          </div>
          <div className="order-1 overflow-hidden md:order-2 rounded-t-2xl md:rounded-3xl md:rounded-l-none">
            <div
              className={cx(
                'flex items-center justify-center w-full h-full bg-cover  bg-blend-overlay bg-black bg-opacity-25',
                {
                  "bg-[url('/images/for-investor/for-investors-why-to-invest.jpg')]":
                    page === 'for-investors',
                  "bg-[url('/images/for-investor/for-investor-category.png')]  bg-center":
                    page === 'for-project-developers',
                }
              )}
            >
              <div className="max-w-lg p-6 pt-10 text-white md:p-10 md:max-w-md">
                <h2 className="mb-6 font-serif text-3xl font-bold lg:text-4xl">
                  {rightText.title}
                </h2>
                <p className="text-lg">{rightText.description}</p>
              </div>
            </div>
          </div>
        </div>
      </LayoutContainer>
    </>
  );
};

export default Description;

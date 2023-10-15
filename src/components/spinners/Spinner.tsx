import React from 'react';
import { BallTriangle } from 'react-loader-spinner';

export interface ISpinnerBallTriangle {
  color: string
}

export const SpinnerBallTriangle = (props: ISpinnerBallTriangle) => {
  return (
    <BallTriangle
      height={100}
      width={100}
      radius={5}
      color={props.color}
      ariaLabel="ball-triangle-loading"
      visible={true}
    />
  );
};

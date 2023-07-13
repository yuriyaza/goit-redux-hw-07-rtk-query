import { RotatingLines } from 'react-loader-spinner';
import css from './Spinner.module.css';

export const Spinner = () => {
  return (
    <div className={css.backdrop}>
      <div className={css.spinner}>
        <RotatingLines width='60' strokeWidth='3' strokeColor='grey' />
      </div>
    </div>
  );
};

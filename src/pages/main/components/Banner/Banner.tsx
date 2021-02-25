import React from 'react';
import classes from "./Banner.module.scss";
import { Logo, Button } from "../../../../shared/components";
import { ButtonTypes, ButtonSize } from "../../../../shared/enums";
import { SearchPanel } from "../"

interface BannerProps {
  onChangeSearchingValue?: (searchingValue: string) => void
}

const Banner: React.FC<BannerProps> = React.memo(({ onChangeSearchingValue = () => {} }) => {
  return (
    <div className={classes.banner}>
      <div className={classes.banner__image}></div>
      <div className={classes.banner__background}></div>
      <div className={classes.banner__content}>
        <div className={classes.banner__header}>
          <Logo />
          <Button type={ButtonTypes.SECONDARY} size={ButtonSize.SMALL} >+ ADD MOVIE</Button>
        </div>
        <h1 className={classes.banner__title}>FIND YOUR MOVIE</h1>
        <SearchPanel onChangeSearchingValue={onChangeSearchingValue} />
      </div>
    </div>
  )
})

export default Banner;
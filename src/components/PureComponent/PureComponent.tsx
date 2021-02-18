import React, { SyntheticEvent } from "react";

interface PureComponentProps {
  message: string;
  color?: string
}

interface PureComponentState {
  color: string;
}

export default class PureComponent extends React.PureComponent<PureComponentProps, PureComponentState> {
  constructor(props: PureComponentProps) {
    super(props);
    this.state = { color: props.color };
  }

  static defaultProps = { color: "#000000" };

  onChangeColor = (event: SyntheticEvent) => {
    this.setState(() => ({ color: (event.target as any).value }));
  };

  render() {
    console.log("PureComponent render");

    const { color } = this.state;
    return (
      <>
        <h2 style={{ color }}>{this.props.message}</h2>
        <input type="color" value={color} onChange={this.onChangeColor} />
      </>
    );
  }
}

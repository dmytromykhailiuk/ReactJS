import React, { SyntheticEvent } from 'react';

interface ComponentProps {
  message: string;
  color?: string
}

interface ComponentState {
  color: string;
}

export default class Component extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = { color: props.color };
  }

  static defaultProps = { color: "#000000" };

  onChangeColor = (event: SyntheticEvent) => {
    this.setState(() => ({ color: (event.target as any).value }));
  };

  render() {
    console.log("Component render");

    const { color } = this.state;
    return (
      <>
        <h2 style={{ color }}>{this.props.message}</h2>
        <input type="color" value={color} onChange={this.onChangeColor} />
      </>
    );
  }
}

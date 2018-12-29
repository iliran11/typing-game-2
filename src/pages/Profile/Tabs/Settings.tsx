import * as React from 'react';

export interface SettingsProps {}

export interface SettingsState {}

export default class Settings extends React.Component<
  SettingsProps,
  SettingsState
> {
  constructor(props: SettingsProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return <div>Settings</div>;
  }
}

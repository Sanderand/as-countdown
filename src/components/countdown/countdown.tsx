import { Component, ComponentInterface, Event, EventEmitter, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

const EVERY_SECOND: number = 1000;
const EVERY_MINUTE: number = EVERY_SECOND * 60;

@Component({
  tag: 'as-countdown',
  styleUrl: 'countdown.css',
  shadow: false,
})
export class CountdownComponent implements ComponentInterface {

  /** The date to count down to */
  @Prop() public date: Date | string | number;

  /** Toggle hiding days */
  @Prop() public hideDays: boolean = false;

  /** Toggle hiding hours */
  @Prop() public hideHours: boolean = false;

  /** Toggle hiding minutes */
  @Prop() public hideMinutes: boolean = false;

  /** Toggle hiding seconds */
  @Prop() public hideSeconds: boolean = false;

  /** The label to display for days */
  @Prop() public daysLabel: string = 'Days';

  /** The label to display for hours */
  @Prop() public hoursLabel: string = 'Hours';

  /** The label to display for minutes */
  @Prop() public minutesLabel: string = 'Minutes';

  /** The label to display for seconds */
  @Prop() public secondsLabel: string = 'Seconds';

  /** Event emitted when countdown has finished */
  @Event() public done!: EventEmitter<null>;

  @State() public days: number = 0;
  @State() public hours: number = 0;
  @State() public minutes: number = 0;
  @State() public seconds: number = 0;

  private _timeout: any = undefined;

  public componentDidLoad(): void {
    this.onDateChange();
  }

  public componentDidUnload(): void {
    this.clearTimeout();
  }

  @Watch('date')
  public onDateChange(): void {
    if (this.date) {
      this.updateTimer();
    } else {
      this.reset();
    }
  }

  public render(): JSX.Element {
    const daysEl = this.hideDays
      ? null
      : <section><div>{ this.days }</div><label>{ this.daysLabel }</label></section>;

    const hoursEl = this.hideHours
      ? null
      : <section><div>{ this.hours }</div><label>{ this.hoursLabel }</label></section>;

    const minutesEl = this.hideMinutes
      ? null
      : <section><div>{ this.minutes }</div><label>{ this.minutesLabel }</label></section>;

    const secondsEl = this.hideSeconds
      ? null
      : <section><div>{ this.seconds }</div><label>{ this.secondsLabel }</label></section>;

    return (
      <Host>
        { daysEl }
        { hoursEl }
        { minutesEl }
        { secondsEl }
      </Host>
    );
  }

  private reset(): void {
    this.days = 0;
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.done.emit();
    this.clearTimeout();
  }

  private getDateAsTimestamp(date: any): number {
    const isDateTimestamp = !isNaN(+date as any);

    if (isDateTimestamp) {
      return new Date(+date).getTime();
    } else {
      const parsedDate: any = new Date(date);
      const isParsedDateValid = parsedDate instanceof Date && !isNaN(parsedDate as any);

      if (isParsedDateValid) {
        return parsedDate.getTime();
      } else {
        throw new Error('could not parse date');
      }
    }
  }

  private isTimestampInThePast(timestamp: number): boolean {
    return timestamp < Date.now();
  }

  private clearTimeout(): void {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  private updateTimer = (): void => {
    let dateAsTimestamp = 0;

    try {
      dateAsTimestamp = this.getDateAsTimestamp(this.date);
    } catch {
      this.reset();
      return;
    }

    if (this.isTimestampInThePast(dateAsTimestamp)) {
      this.reset();
      return;
    }

    let delta = Math.abs(dateAsTimestamp - Date.now()) / 1000;
    this.days = Math.floor(delta / 86400);

    delta -= this.days * 86400;
    this.hours = Math.floor(delta / 3600) % 24;

    delta -= this.hours * 3600;
    this.minutes = Math.floor(delta / 60) % 60;

    delta -= this.minutes * 60;
    this.seconds = Math.round(delta % 60);

    this._timeout = setTimeout(this.updateTimer, this.hideSeconds ? EVERY_MINUTE : EVERY_SECOND);
  }
}

import { Component, createSignal, For } from 'solid-js';

import { Modal } from '../../component';
import type { SelectDataSourceItem } from '../../component';
import i18n from '../../i18n';

export interface DatepickerModelProps {
  locale: string;
  onClose: () => void;
  onConfirm: (selectedDate: number) => void;
}

const DatepickerModel: Component<DatepickerModelProps> = (props) => {
  const [currentDate, setCurrentDate] = createSignal(new Date());
  const [selectedDate, setSelectedDate] = createSignal<Date | null>(null);
  const [viewMode, setViewMode] = createSignal<'days' | 'months' | 'years'>(
    'days',
  );

  const daysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();
  const startOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const generateYears = () => {
    const currentYear = currentDate().getFullYear();
    return Array.from({ length: 12 }, (_, i) => currentYear - 5 + i);
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      currentDate().getFullYear(),
      currentDate().getMonth(),
      day,
    );
    if (newDate <= new Date()) {
      setSelectedDate(newDate);
    }
  };

  const handleMonthClick = (month: number) => {
    setCurrentDate(new Date(currentDate().getFullYear(), month, 1));
    setViewMode('days');
  };

  const handleYearClick = (year: number) => {
    setCurrentDate(new Date(year, currentDate().getMonth(), 1));
    setViewMode('months');
  };

  const changeMonth = (delta: number) => {
    const newDate = new Date(currentDate());
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  const changeYear = (delta: number) => {
    const newDate = new Date(currentDate());
    newDate.setFullYear(newDate.getFullYear() + delta);
    setCurrentDate(newDate);
  };
  return (
    <Modal
      title={i18n('Move to', props.locale)}
      width={320}
      buttons={[
        {
          children: i18n('confirm', props.locale),
          onClick: () => {
            const date = selectedDate();
            if (date) {
              const timestamp = date.getTime();
              props.onConfirm(timestamp);
            }
            props.onClose();
          },
        },
      ]}
      onClose={props.onClose}
    >
      <div class="datepicker">
        <div class="datepicker-header">
          <button
            class="datepicker-nav"
            onClick={() =>
              viewMode() === 'days' ? changeMonth(-1) : changeYear(-1)
            }
          >
            &lt;
          </button>
          <div
            class="datepicker-current"
            onClick={() =>
              setViewMode(viewMode() === 'days' ? 'months' : 'years')
            }
          >
            {viewMode() === 'days' &&
              `${months[currentDate().getMonth()]} ${currentDate().getFullYear()}`}
            {viewMode() === 'months' && currentDate().getFullYear()}
            {viewMode() === 'years' &&
              `${generateYears()[0]} - ${generateYears()[generateYears().length - 1]}`}
          </div>
          <button
            class="datepicker-nav"
            onClick={() =>
              viewMode() === 'days' ? changeMonth(1) : changeYear(1)
            }
          >
            &gt;
          </button>
        </div>
        <div class="datepicker-body">
          {viewMode() === 'days' && (
            <>
              <div class="datepicker-weekdays">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                  (day) => (
                    <div class="datepicker-weekday">{day}</div>
                  ),
                )}
              </div>
              <div class="datepicker-days">
                <For
                  each={Array.from(
                    {
                      length: startOfMonth(
                        currentDate().getFullYear(),
                        currentDate().getMonth(),
                      ),
                    },
                    (_, i) => i,
                  )}
                >
                  {() => <div class="datepicker-day empty"></div>}
                </For>
                <For
                  each={Array.from(
                    {
                      length: daysInMonth(
                        currentDate().getFullYear(),
                        currentDate().getMonth(),
                      ),
                    },
                    (_, i) => i + 1,
                  )}
                >
                  {(day) => {
                    const date = new Date(
                      currentDate().getFullYear(),
                      currentDate().getMonth(),
                      day,
                    );
                    const isFuture = date > new Date();
                    return (
                      <div
                        class={`datepicker-day ${selectedDate()?.getDate() === day ? 'selected' : ''} ${isFuture ? 'future' : ''}`}
                        onClick={() => !isFuture && handleDateClick(day)}
                      >
                        {day}
                      </div>
                    );
                  }}
                </For>
              </div>
            </>
          )}
          {viewMode() === 'months' && (
            <div class="datepicker-months">
              <For each={months}>
                {(month, index) => (
                  <div
                    class="datepicker-month"
                    onClick={() => handleMonthClick(index())}
                  >
                    {month}
                  </div>
                )}
              </For>
            </div>
          )}
          {viewMode() === 'years' && (
            <div class="datepicker-years">
              <For each={generateYears()}>
                {(year) => (
                  <div
                    class="datepicker-year"
                    onClick={() => handleYearClick(year)}
                  >
                    {year}
                  </div>
                )}
              </For>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DatepickerModel;

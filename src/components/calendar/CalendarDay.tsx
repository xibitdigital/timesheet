import styled from 'styled-components'

interface GridAreaProps {
  week: number
  day: number
  holiday: boolean
}

export const CalendarDay = styled.div<GridAreaProps>`
  display: grid;
  grid-area: ${(props) => props.week} / ${(props) => props.day};
  padding: 0.5em;
  grid-template-rows: min-content min-content;
  grid-template-columns: 3fr 1fr;
  grid-template-areas: 'title actions' 'form form';
  padding: 1em;
`

export const CalendarDayTitle = styled.div`
  padding: 0.5em;
  font-weight: 500;
  display: flex;
  align-items: center;
  grid-area: title;
`

export const CalendarDayActions = styled.div`
  display: flex;
  align-items: center;
  grid-area: actions;
`

export const CalendarDayForm = styled.div`
  grid-area: form;
`

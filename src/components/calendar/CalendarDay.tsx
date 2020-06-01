import styled from 'styled-components'

interface GridAreaProps {
  week: number
  day: number
}

export const CalendarDay = styled.div<GridAreaProps>`
  display: grid;
  grid-area: ${(props) => props.week} / ${(props) => props.day};
  padding: 0.5em;
`

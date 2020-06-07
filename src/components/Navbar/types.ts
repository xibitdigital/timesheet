import { Routes } from '../../shared/routes'

export type RouteAction = () => void

export interface NavBarMenuItem {
  title: string
  action: RouteAction
  icon: React.ReactNode
}

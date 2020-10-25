import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledRouterLink exact activeClassName="active" to="/">主页</StyledRouterLink>
      <StyledRouterLink exact activeClassName="active" to="/dashboard">面板</StyledRouterLink>
      <StyledRouterLink exact activeClassName="active" to="/governance">拍卖</StyledRouterLink>
      <StyledRouterLink exact activeClassName="active" to="/farm">租赁</StyledRouterLink>
      <StyledRouterLink exact activeClassName="active" to="/migrate">规划</StyledRouterLink>
      <StyledRouterLink exact activeClassName="active" to="/faq">FAQ</StyledRouterLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledRouterLink = styled(NavLink)`
  color: ${props => props.theme.colors.grey[500]};
  font-weight: 700;
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.colors.grey[600]};
  }
  &.active {
    color: ${props => props.theme.colors.primary.main};
  }
`

const StyledLink = styled.a`
  color: ${props => props.theme.colors.grey[500]};
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    color: ${props => props.theme.colors.grey[600]};
  }
`

export default Nav

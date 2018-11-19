import React, { SFC } from 'react'
import { Text, View } from 'react-native'

import { trimNewLinesAndSpaces } from 'shared-core/dist/utils/helpers/shared'
import { Octicons as Icon } from '../../../../libs/vector-icons'
import { fixURL } from '../../../../utils/helpers/github/url'
import { Link } from '../../../common/Link'
import { ThemeConsumer } from '../../../context/ThemeContext'
import { getCardStylesForTheme } from '../../styles'
import { getCardRowStylesForTheme } from './styles'

export interface WikiPageRowProps {
  isRead: boolean
  name?: string
  showMoreItemsIndicator?: boolean
  smallLeftColumn?: boolean
  title: string
  url: string
}

export interface WikiPageRowState {}

export const WikiPageRow: SFC<WikiPageRowProps> = ({
  isRead,
  name,
  showMoreItemsIndicator,
  smallLeftColumn,
  title: _title,
  url,
}) => {
  const title = trimNewLinesAndSpaces(_title || name)
  if (!title) return null

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <View style={getCardRowStylesForTheme(theme).container}>
          <View
            style={[
              getCardStylesForTheme(theme).leftColumn,
              smallLeftColumn
                ? getCardStylesForTheme(theme).leftColumn__small
                : getCardStylesForTheme(theme).leftColumn__big,
            ]}
          />

          <View style={getCardStylesForTheme(theme).rightColumn}>
            <Link
              href={showMoreItemsIndicator ? undefined : fixURL(url)}
              style={getCardRowStylesForTheme(theme).mainContentContainer}
            >
              <Text
                numberOfLines={1}
                style={[
                  getCardStylesForTheme(theme).normalText,
                  isRead && getCardStylesForTheme(theme).mutedText,
                ]}
              >
                <Icon name="book" /> {showMoreItemsIndicator ? '' : title}
                {!!showMoreItemsIndicator && (
                  <Text
                    numberOfLines={1}
                    style={[
                      getCardStylesForTheme(theme).normalText,
                      getCardStylesForTheme(theme).mutedText,
                    ]}
                  >
                    ...
                  </Text>
                )}
              </Text>
            </Link>
          </View>
        </View>
      )}
    </ThemeConsumer>
  )
}
import React from 'react'

import numeral from 'numeral'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardTitle,
  Spacer,
} from 'react-neu'

import FancyValue from 'components/FancyValue'
import Split from 'components/Split'

import useTreasury from 'hooks/useTreasury'

const Treasury: React.FC = () => {
  const { totalYUsdValue, yamBalance, yUsdBalance } = useTreasury()
  
  const treasuryValue = typeof totalYUsdValue !== 'undefined' && totalYUsdValue !== 0
    ? '$'+numeral(totalYUsdValue * 1.15).format('0.00a')
    : '--'

  const yamValue = typeof yamBalance !== 'undefined'
    ? numeral(yamBalance).format('0.00a')
    : '--'

  const yUsdValue = typeof yUsdBalance !== 'undefined'
    ? numeral(yUsdBalance).format('0.00a')
    : '--'

  return (
    <Card>
      <CardTitle text="Treasury Overview" />
      <Spacer size="sm" />
      <CardContent>
        <Split>
          <FancyValue
            icon="💰"
            label="艺术品总估值"
            value={treasuryValue}
          />
          <FancyValue
            icon="🎨"
            label="艺术品数量"
            value={yUsdValue}
          />
          <FancyValue
            icon="🛒"
            label="已交易金额"
            value={yamValue}
          />
        </Split>
        <Spacer />
      </CardContent>
      <CardActions>
        <Box row justifyContent="center">
          <Button
            href="https://etherscan.io/address/0xcf27ca116dd5c7b4201c75b46489d1c075362087"
            text="View On Qtum"
            variant="secondary"
          />
        </Box>
      </CardActions>
    </Card>
  )
}

export default Treasury
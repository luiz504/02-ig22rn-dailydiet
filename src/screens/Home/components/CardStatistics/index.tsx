import { FC, useState } from 'react'
import { Modal, TouchableOpacityProps } from 'react-native'

import { useStatisticsCommons } from './common'

import { Text } from '~/components/Text'
import { ModalContent } from './ModalContent'

import { Container, ArrowIcon } from './styles'

import { Statistics } from '~/models/Statistics'
interface CardStatistics extends TouchableOpacityProps {
  statistics: Statistics
}

export const CardStatistics: FC<CardStatistics> = ({ statistics, testID }) => {
  const {
    percentageString,
    theme: { arrowColor, backgroundColor },
  } = useStatisticsCommons(statistics)

  //* Modal Handlers
  const [isModalOpen, setIsModalOpen] = useState(false)
  const onRequestToClose = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Container
        style={{ backgroundColor }}
        testID={testID}
        onPress={() => setIsModalOpen(true)}
      >
        <ArrowIcon color={arrowColor} testID="arrow-icon" />
        <Text weight="bold" size={'2xl'} testID="heading">
          {percentageString}
        </Text>
        <Text size={'sm'} testID="span" color="gray-700">
          of the meals within the diet
        </Text>
      </Container>

      <Modal
        visible={isModalOpen}
        statusBarTranslucent
        animationType="slide"
        onRequestClose={onRequestToClose}
      >
        <ModalContent
          statistics={statistics}
          onRequestToClose={onRequestToClose}
        />
      </Modal>
    </>
  )
}

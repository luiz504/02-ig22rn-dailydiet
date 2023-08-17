import { FC } from 'react'
import { Modal } from 'react-native'

import { Content, Overlay, Row } from './styles'
import { Button } from '~/components/Button'
import { Text } from '~/components/Text'

type AlertDeleteProps = {
  show: boolean
  onDismiss: () => void
  onConfirm: () => void
  testID?: string
}
export const AlertDelete: FC<AlertDeleteProps> = ({
  show,
  onDismiss,
  onConfirm,
  testID = 'alert-delete-modal',
}) => {
  if (!show) return null

  return (
    <Modal
      onDismiss={onDismiss}
      transparent
      animationType="fade"
      testID={testID}
    >
      <Overlay onTouchEnd={() => onDismiss()} testID="alert-delete-overlay">
        <Content testID="alert-delete-content">
          <Text size={'lg'} testID="alert-delete-heading">
            Do you really want to delete the meal record?
          </Text>

          <Row testID="alert-delete-btns-row">
            <Button
              style={{ flex: 1 }}
              variant="outline"
              label={'Cancel'}
              onPress={onDismiss}
              testID="alert-delete-btn-dismiss"
            />

            <Button
              style={{ flex: 1 }}
              label={'Yes, delete'}
              onPress={onConfirm}
              testID="alert-delete-btn-confirm"
            />
          </Row>
        </Content>
      </Overlay>
    </Modal>
  )
}

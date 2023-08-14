import { FC, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { HeaderShort } from '~/components/HeaderShort'

import { Theme } from '~/components/Theme'
import { ContentSection } from '~/components/ContentSection'

import { Input } from '~/components/Input'
import { Form } from '~/components/Form'
import { Select } from '~/components/Select'
import { Button } from '~/components/Button'

// import styles from './styles'

export const NewDiet: FC = () => {
  const navigator = useNavigation()

  const [isInDiet, setIsInDiet] = useState<boolean | undefined>()

  return (
    <Theme variant={'gray'}>
      <HeaderShort
        title="New meal"
        onReturnRequest={() => navigator.navigate('home')}
      />

      <ContentSection>
        <Form.Wrapper style={{ marginBottom: 32 }}>
          <Form.Col>
            <Form.Label>Name</Form.Label>
            <Input />
          </Form.Col>

          <Form.Col>
            <Form.Label>Description</Form.Label>
            <Input multiline numberOfLines={5} />
          </Form.Col>

          <Form.Row variant="lg">
            <Form.Col style={{ flex: 1 }}>
              <Form.Label>Date</Form.Label>
              <Input />
            </Form.Col>

            <Form.Col style={{ flex: 1 }}>
              <Form.Label>Hour</Form.Label>
              <Input />
            </Form.Col>
          </Form.Row>

          <Form.Col>
            <Form.Label>Is it in Diet?</Form.Label>
            <Form.Row variant="md">
              <Select.Button
                variant="green"
                isSelected={!!isInDiet}
                style={{ flex: 1 }}
                onPress={() => setIsInDiet(true)}
              >
                <Select.Dot variant="green" />
                <Select.Label>Yes</Select.Label>
              </Select.Button>

              <Select.Button
                variant="red"
                isSelected={isInDiet === false}
                style={{ flex: 1 }}
                onPress={() => setIsInDiet(false)}
              >
                <Select.Dot variant="red" />
                <Select.Label>No</Select.Label>
              </Select.Button>
            </Form.Row>
          </Form.Col>
        </Form.Wrapper>

        <Button style={{ marginTop: 'auto' }} label="Register meal" />
      </ContentSection>
    </Theme>
  )
}

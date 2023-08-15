import { FC, useMemo, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { subMonths } from 'date-fns'

import { formatDate, formatTime, userConfig } from '~/utils/dataTimeFormatter'

import { HeaderShort } from '~/components/HeaderShort'
import { Theme } from '~/components/Theme'
import { ContentSection } from '~/components/ContentSection'
import { Input } from '~/components/Input'
import { Form } from '~/components/Form'
import { Select } from '~/components/Select'
import { Button } from '~/components/Button'
import { DatePicker } from '~/components/DatePicker'

export const NewDiet: FC = () => {
  const inputNameRef = useRef<TextInput>(null)
  const inputDescriptionRef = useRef<TextInput>(null)

  const blurInputs = () => {
    inputNameRef.current?.blur()
    inputDescriptionRef.current?.blur()
  }

  const navigator = useNavigation()

  const [isInDiet, setIsInDiet] = useState<boolean | undefined>()

  const [dateTime, setDateTime] = useState<Date>(new Date())

  const handleDateTimePickerModal = (mode: 'date' | 'time') => {
    blurInputs()
    DateTimePickerAndroid.open({
      mode,
      value: dateTime,
      minimumDate: subMonths(new Date(), 1),
      maximumDate: new Date(),
      is24Hour: userConfig.uses24hoursClock,
      onChange: ({ type }, value) =>
        type === 'set' && setDateTime(value as Date),
    })
  }

  const dateTimeString = useMemo(() => {
    const date = formatDate(dateTime)
    const time = formatTime(dateTime)

    return { date, time }
  }, [dateTime])

  const handleCreateMeal = () => {
    navigator.navigate('home')
  }

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

            <Input ref={inputNameRef} />
          </Form.Col>

          <Form.Col>
            <Form.Label>Description</Form.Label>

            <Input
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              ref={inputDescriptionRef}
            />
          </Form.Col>

          <Form.Row variant="lg">
            <Form.Col style={{ flex: 1 }}>
              <Form.Label>Date</Form.Label>

              <DatePicker.Button
                onPress={() => handleDateTimePickerModal('date')}
              >
                <DatePicker.Label numberOfLines={1}>
                  {dateTimeString.date}
                </DatePicker.Label>
              </DatePicker.Button>
            </Form.Col>

            <Form.Col style={{ flex: 1 }}>
              <Form.Label>Hour</Form.Label>

              <DatePicker.Button
                onPress={() => handleDateTimePickerModal('time')}
              >
                <DatePicker.Label numberOfLines={1}>
                  {dateTimeString.time}
                </DatePicker.Label>
              </DatePicker.Button>
            </Form.Col>
          </Form.Row>

          <Form.Col variant="md">
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

        <Button
          style={{ marginTop: 'auto' }}
          label="Register meal"
          onPress={handleCreateMeal}
        />
      </ContentSection>
    </Theme>
  )
}

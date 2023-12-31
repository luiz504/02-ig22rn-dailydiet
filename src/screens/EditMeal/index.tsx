import { FC, useMemo, useState } from 'react'
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { endOfDay, subMonths } from 'date-fns'

import { updateMeal } from '~/storage/meals/updateMeal'

import { formatDate, formatTime } from '~/utils/dateTimeFormatters'
import { getChangedProperties } from '~/utils/getChangedProperties'

import { HeaderShort } from '~/components/HeaderShort'
import { Theme } from '~/components/Theme'
import { ContentSection } from '~/components/ContentSection'
import { Input } from '~/components/Input'
import { Form } from '~/components/Form'
import { Select } from '~/components/Select'
import { Button } from '~/components/Button'
import { DatePicker } from '~/components/DatePicker'

import { Meal } from '~/models/Meal'

const editMealSchema = z.object({
  name: z.string().nonempty({ message: 'Meal name required.' }),
  description: z.string(),
  date: z.date().max(endOfDay(new Date()), "Today's Date & time limit."),
  inDiet: z.boolean(),
})

type EditMealType = z.infer<typeof editMealSchema>

type RouteParams = {
  meal: Meal
  groupName: string
}

export const EditMeal: FC = () => {
  const navigator = useNavigation()
  const { meal, groupName } = useRoute().params as RouteParams

  const [isOpenDatePicker, setIsOpenDatePicker] = useState<
    'date' | 'time' | undefined
  >()

  const handleDateTimePickerModal = (mode?: 'date' | 'time') => {
    Keyboard.dismiss()

    setIsOpenDatePicker(mode)
  }

  const {
    control,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<EditMealType>({
    resolver: zodResolver(editMealSchema),
    defaultValues: {
      name: meal.name,
      description: meal.description,
      date: new Date(meal.date),
      inDiet: meal.inDiet,
    },
  })

  const dateTime = watch('date')

  const dateTimeString = useMemo(() => {
    const date = formatDate(dateTime)
    const time = formatTime(dateTime)

    return { date, time }
  }, [dateTime])

  const handleEditMeal = async (data: EditMealType) => {
    const { date } = data

    const dateStringified = date.toISOString()

    const changes = getChangedProperties(meal, {
      ...data,
      date: dateStringified,
    })

    if (changes) {
      try {
        await updateMeal(
          { id: meal.id, groupName },
          { ...changes, date: changes?.date ? date : undefined },
        )

        navigator.navigate('meal', {
          meal: { ...meal, ...changes },
          groupName,
        })
      } catch (err) {
        Alert.alert(
          'Update Meal Error :/',
          'Something went wrong with the update process, please try again.',
        )
      }
    } else {
      navigator.navigate('meal', { meal, groupName })
    }
  }

  return (
    <Theme variant={'gray'}>
      <HeaderShort
        title="Edit meal"
        onReturnRequest={() => navigator.goBack()}
      />

      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        testID="form"
      >
        <ContentSection>
          <Form.Wrapper style={{ marginBottom: 32 }}>
            <Form.Col>
              <Form.Label>Name</Form.Label>

              <Controller
                name="name"
                control={control}
                render={({ field: { ref, onChange, value } }) => (
                  <Input
                    ref={ref}
                    defaultValue={value}
                    onChangeText={onChange}
                    testID="input-name"
                    onSubmitEditing={() => setFocus('description')}
                  />
                )}
              />
              {errors.name && (
                <Form.Error testID="name-error">
                  {errors.name.message}
                </Form.Error>
              )}
            </Form.Col>

            <Form.Col>
              <Form.Label>Description</Form.Label>
              <Controller
                name="description"
                control={control}
                render={({ field: { ref, onChange, value } }) => (
                  <Input
                    ref={ref}
                    defaultValue={value}
                    onChangeText={onChange}
                    multiline
                    numberOfLines={5}
                    textAlignVertical="top"
                    testID="input-description"
                  />
                )}
              />
            </Form.Col>

            <Form.Row variant="lg">
              <Controller
                name="date"
                control={control}
                render={({ field: { onChange } }) => (
                  <DateTimePicker
                    isVisible={!!isOpenDatePicker}
                    mode={isOpenDatePicker}
                    onCancel={handleDateTimePickerModal}
                    onConfirm={(d) => {
                      handleDateTimePickerModal()
                      onChange(d)
                    }}
                    minimumDate={subMonths(new Date(), 1)}
                    date={dateTime}
                    testID="date-time-picker"
                  />
                )}
              />

              <Form.Col style={{ flex: 1 }}>
                <Form.Label>Date</Form.Label>

                <DatePicker.Button
                  onPress={() => handleDateTimePickerModal('date')}
                  testID="btn-date"
                >
                  <DatePicker.Label numberOfLines={1} testID="label-date">
                    {dateTimeString.date}
                  </DatePicker.Label>
                </DatePicker.Button>
              </Form.Col>

              <Form.Col style={{ flex: 1 }}>
                <Form.Label>Hour</Form.Label>

                <DatePicker.Button
                  onPress={() => handleDateTimePickerModal('time')}
                  testID="btn-time"
                >
                  <DatePicker.Label numberOfLines={1} testID="label-time">
                    {dateTimeString.time}
                  </DatePicker.Label>
                </DatePicker.Button>
              </Form.Col>

              {errors.date && (
                <Form.Error testID="date-error">
                  {errors.date.message}
                </Form.Error>
              )}
            </Form.Row>

            <Form.Col variant="md">
              <Form.Label>Is it in Diet?</Form.Label>

              <Controller
                name="inDiet"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Form.Row variant="md">
                    <Select.Button
                      variant="green"
                      isSelected={!!value}
                      style={{ flex: 1 }}
                      onPress={() => onChange(true)}
                      testID={'btn-in-diet'}
                    >
                      <Select.Dot variant="green" />
                      <Select.Label>Yes</Select.Label>
                    </Select.Button>

                    <Select.Button
                      variant="red"
                      isSelected={value === false}
                      style={{ flex: 1 }}
                      onPress={() => onChange(false)}
                      testID={'btn-out-diet'}
                    >
                      <Select.Dot variant="red" />
                      <Select.Label>No</Select.Label>
                    </Select.Button>
                  </Form.Row>
                )}
              />
            </Form.Col>
          </Form.Wrapper>

          <Button
            style={{ marginTop: 'auto' }}
            label="Save Changes"
            onPress={handleSubmit(handleEditMeal)}
            disabled={isSubmitting}
            testID="btn-submit"
          />
        </ContentSection>
      </TouchableWithoutFeedback>
    </Theme>
  )
}

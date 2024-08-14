import { View, KeyboardAvoidingView, Text, ScrollView, Image, Alert, Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { signIn } from '../../lib/appwrite'

const SignIn = () => {

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const submit = async () => {
    if( !form.email || !form.password){
       Alert.alert("Error", "Don't you know how to fill a form? Fill it well!")
    }

    setIsSubmitting(true);

    try {
      const result = await signIn(form.email, form.password)
      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={100} // Adjust this value if needed
      >
        <ScrollView>
          <View className="w-full justify-center min-h-[84vh] px-4 my-6">
            <Image source={images.logo}
              resizeMode='contain' className="w-[135px] h-[65px]"
            />

            <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>
              Log in to Ndet 
            </Text>

            <FormField 
              title='Email'
              value={form.email}
              handleChangeText={(e) => setForm({...form, email: e})}
              otherStyles='mt-7'
              keyboardType='email-address'
            />

            <FormField 
              title='Password'
              value={form.password}
              handleChangeText={(e) => setForm({...form, password: e})}
              otherStyles='mt-7'
            />

            <CustomButton 
              title='Sign in'
              handlePress={submit}
              containerStyles='mt-10'
              isLoading={isSubmitting}
            />

            <View className='justify-center pt-5 flex-row gap-2'>
              <Text className='text-lg text-gray-100 font-pregular'>
                Don't have an account?
              </Text>
              <Link href='/sign-up' className='text-lg font-psemibold text-secondary'> Sign Up</Link>
            </View>
          </View>        
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  )
}

export default SignIn

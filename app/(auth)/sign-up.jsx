import { View, Text, ScrollView,KeyboardAvoidingView,Platform, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { createUser } from '../../lib/appwrite'

const SignUp = () => {

  const [form, setForm] = useState({
    username:'',
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
      if(!form.username || !form.email || !form.password){
        Alert.alert("Error", "Don't you know how to fill a form ? fill it well !!")
      }

      setIsSubmitting(true);

      try {
        const result = await createUser(form.email, form.password, form.username)


        router.replace('/home')
      } catch (error) {
        Alert.alert('Error', error.message)
      }finally{
        setIsSubmitting(false)
      }

  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 , marginBottom:30}}
        keyboardVerticalOffset={100} // Adjust this value if needed
      >
      <ScrollView>
        <View className="w-full justify-center min-h-[84vh] px-4 my-6">
          <Image source={images.logo}
          resizeMode='contain' className="w-[135px] h-[65px]"
          />

          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>
            Sign Up to Ndet 
          </Text>

          <FormField 
            title='Username'
            value={form.username}
            handleChangeText={(e) => setForm({...form, username: e})}
            otherStyles='mt-10'
          />

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
            title='Sign up'
            handlePress={submit}
            containerStyles='mt-10 '
            isLoading={isSubmitting     }
          />

          <View className='justify-center pt-5 flex-row gap-2'>
             <Text className='text-lg text-gray-100 font-pregular'>
              Have an account already?
             </Text>
             <Link href='/sign-in' className='text-lg font-psemibold text-secondary'> Sign in</Link>
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar backgroundColor="#161622" style="light" />

    </SafeAreaView>
  )
}

export default SignUp
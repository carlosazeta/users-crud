import { Button, Card, TextInput, Title, Badge } from "@tremor/react";
import { useUserActions } from '../hooks/useUserActions'
import { useState } from "react";

export function CreateNewUser () {

  const { addUser } = useUserActions()
  const [result, setResult] = useState<'ok' | 'ko' | null>(null)
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setResult(null)

    const form = event.currentTarget
    const formData = new FormData(form)

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const github = formData.get('github') as string

    if(!name || !email || !github) {
      console.log(result)
      return setResult('ko')
    }

    addUser({name, email, github})
    setResult('ok')
    form.reset()
  }

  return(
    <Card>
      <Title>Create New User</Title>
        <form onSubmit={handleSubmit}>
          <TextInput
            name='name'
            placeholder="Name..."
          />
          <TextInput
            name='email'
            placeholder="Email"
          />
          <TextInput
            name='github'
            placeholder="Github user"
          />
          <div>
            <Button
              type="submit"
              style={{marginTop: '16px'}}
            >
              Add user
            </Button>
            <span>
              {result === 'ok' && <Badge color='green'>Save correct!</Badge>}
              {result === 'ko' && <Badge color='red'>You must fill all the inputs</Badge>}
            </span>
          </div>
        </form>
    </Card>
  )
}
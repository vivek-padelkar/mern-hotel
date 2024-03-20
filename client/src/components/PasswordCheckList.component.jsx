import PasswordChecklist from 'react-password-checklist'

const PasswordCheckList = ({
  password,
  retypePassword,
  setIsValidPassword,
}) => {
  return (
    <PasswordChecklist
      rules={['minLength', 'specialChar', 'number', 'capital', 'match']}
      minLength={5}
      value={password}
      valueAgain={retypePassword}
      onChange={(isValid) => {
        setIsValidPassword(isValid)
      }}
    />
  )
}

export default PasswordCheckList

import PasswordChecklist from 'react-password-checklist'

const PasswordCheckList = ({
  password,
  retypePassword,
  setIsValidPassword,
}) => {
  return (
    <div>
      <h1 className="mb-2">Password checks: </h1>
      <PasswordChecklist
        rules={['minLength', 'specialChar', 'number', 'capital', 'match']}
        minLength={5}
        value={password}
        valueAgain={retypePassword}
        onChange={(isValid) => {
          setIsValidPassword(isValid)
        }}
      />
    </div>
  )
}

export default PasswordCheckList

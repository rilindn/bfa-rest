const getBirthdateByAge = (age: any) => {
  const date = new Date()
  const yearDate = date.setFullYear(date.getFullYear() - age)
  return new Date(yearDate)
}

export default getBirthdateByAge

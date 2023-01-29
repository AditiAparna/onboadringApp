export function validateDOB(value: string) {
  const dob = (value.match(/\d/g) || []).join('');
  if (dob.length !== 8) {
    return false;
  }

  const day = dob.substring(0, 2);
  const month = dob.substring(2, 4);
  const year = dob.substring(4, 8);

  if (
    !(day >= '01' && day <= '31') ||
    !(month >= '01' && month <= '12') ||
    !(year >= '18' && year <= '99')
  ) {
    return false;
  }

  const d = parseInt(day);
  const m = parseInt(month) - 1;
  const y = parseInt(year);

  const date = new Date(y, m, d);
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m ||
    date.getDate() !== d
  ) {
    return false;
  }

  const currentYear = new Date().getFullYear();
  if (y > currentYear) {
    return false;
  }

  if (currentYear - y < 18) {
    return false;
  }

  return true;
}

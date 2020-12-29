export type V1PasswordPolicy = {
  lower: number;
  upper: number;
  character: string;
  password: string;
};

export type V2PasswordPolicy = {
  first_position: number;
  second_position: number;
  character: string;
  password: string;
};

export const parseV1PasswordPolicy = (
  policyString: string
): V1PasswordPolicy => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const { lower, upper, character, password } = policyString.match(
    /(?<lower>\d+)-(?<upper>\d+) (?<character>[a-z]): (?<password>[a-z]+)/
  )?.groups!;

  return {
    lower: Number(lower),
    upper: Number(upper),
    character,
    password,
  };
};

export const parseV2PasswordPolicy = (
  policyString: string
): V2PasswordPolicy => {
  const {
    first_position,
    second_position,
    character,
    password,
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  } = policyString.match(
    /(?<first_position>\d+)-(?<second_position>\d+) (?<character>[a-z]): (?<password>[a-z]+)/
  )?.groups!;

  return {
    first_position: Number(first_position),
    second_position: Number(second_position),
    character,
    password,
  };
};

export const v1Validate = (policy: V1PasswordPolicy): boolean => {
  const occurrences = countOccurrences(policy.character, policy.password);
  return occurrences >= policy.lower && occurrences <= policy.upper;
};

export const v2Validate = (policy: V2PasswordPolicy): boolean => {
  const indexes = findAllIndexes(policy.character, policy.password);
  if (indexes.length < 1) {
    return false;
  }

  // -1 for the password policy not being zero indexed
  const first_index_matches = indexes.includes(policy.first_position - 1);
  const second_index_matches = indexes.includes(policy.second_position - 1);

  // This is an XOR
  return first_index_matches ? !second_index_matches : second_index_matches;
};

const countOccurrences = (needle: string, haystack: string): number =>
  haystack.split(needle).length - 1;

const findAllIndexes = (needle: string, haystack: string): number[] =>
  haystack
    .split("")
    .reduce((a, e, i) => (e === needle ? a.concat(i) : a), [] as number[]);

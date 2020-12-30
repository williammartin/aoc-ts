type Group = {
  individualAnswers: string[][];
};

export const parseGroup = (encodedGroup: string): Group => {
  return {
    individualAnswers: encodedGroup
      .split("\n")
      .map((answers) => answers.split("")),
  };
};

export const collectDistinctAnswers = (group: Group): string[] =>
  Array.from(
    new Set(group.individualAnswers.reduce((a, b) => a.concat(b), []))
  );

export const collectIntersectedAnswers = (group: Group): string[] =>
  Array.from(
    group.individualAnswers
      .map((answers) => new Set([...answers]))
      .reduce(
        (intersection, set) =>
          new Set([...intersection].filter((i) => set.has(i)))
      )
  );

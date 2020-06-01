// Newer Shadow API

export const boxShadow = (theme) =>
  `inset -1px -1px ${theme.colors.gray[0]},
   inset 1px 1px ${theme.colors.gray[3]},
   inset -2px -2px ${theme.colors.gray[1]};`;
export const recessedBoxShadow = (theme) =>
  `inset -1px -1px ${theme.colors.gray[3]}, inset 1px 1px ${theme.colors.gray[0]},
   inset -2px -2px ${theme.colors.gray[2]}, inset 2px 2px ${theme.colors.gray[1]},
   inset 0 3px ${theme.colors.gray[3]};`;
// export const clickedBoxShadow = (theme) =>
//   `inset -1px -1px ${theme.colors.gray[3]},
//    inset 1px 1px ${theme.colors.gray[0]},
//    inset -2px -2px ${theme.colors.gray[2]},
//    inset 2px 2px ${theme.colors.gray[1]};`;

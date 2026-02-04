import { IconName } from "@/components/common/Icon";
import { useTheme } from "./useTheme";

interface UseIconProps {
  name: IconName;
  size?: number;
  color?: string;
}

export const useIcon = ({ name, size = 24, color }: UseIconProps) => {
  const { colors } = useTheme();

  return {
    name,
    size,
    color: color || colors.text,
  };
};

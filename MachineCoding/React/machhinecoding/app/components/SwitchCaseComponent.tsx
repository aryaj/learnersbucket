import React, { Children, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";

// A case value can either be a literal (like "20") or a function
// that receives the switch value and returns true/false.
type CaseValue<T> = T | ((value: T) => boolean);

// Props accepted by CustomSwitch.
// - value: the current switch input to match against cases.
// - children: any nested CustomCase or DefaultCase elements.
interface CustomSwitchProps<T = string> {
  value: T;
  children?: ReactNode;
}

// Props accepted by CustomCase.
// - value: the case matcher, can be constant or predicate function.
// - children: the content shown when this case matches.
interface CustomCaseProps<T = string> {
  value: CaseValue<T>;
  children?: ReactNode;
}

// Props accepted by DefaultCase.
// It only renders children when no CustomCase matches.
interface DefaultCaseProps {
  children?: ReactNode;
}

// CustomCase is a simple wrapper for the case branch children.
const CustomCase = ({ children }: CustomCaseProps) => {
  return <>{children}</>;
};

// DefaultCase is a wrapper for fallback content.
const DefaultCase = ({ children }: DefaultCaseProps) => {
  return <>{children}</>;
};

// Assign display names to components so they are easier to recognize
// in debugging and when comparing child.type.
CustomCase.displayName = "CustomCase";
DefaultCase.displayName = "DefaultCase";

// CustomSwitch inspects its children and selects matching cases.
const CustomSwitch = <T extends string | number>({
  children,
  value,
}: CustomSwitchProps<T>): ReactNode => {
  // Store matching cases here.
  const matches: ReactElement[] = [];
  // Store fallback default cases here.
  const defaultMatches: ReactElement[] = [];

  // React.Children.forEach normalizes `children` and iterates safely.
  Children.forEach(children, (child) => {
    // Skip anything that is not a valid React element.
    if (!isValidElement(child)) {
      return;
    }

    // If the child is a CustomCase, compare its value.
    if (child.type === CustomCase) {
      const childProps = child.props as { value: CaseValue<T> };
      const childValue = childProps.value;

      // If case value is a function, call it with the current switch value.
      if (typeof childValue === "function") {
        if (childValue(value)) {
          matches.push(child);
        }
      } else if (childValue === value) {
        // Otherwise compare the literal values.
        matches.push(child);
      }
    } else if (child.type === DefaultCase) {
      // Collect DefaultCase children for fallback rendering.
      defaultMatches.push(child);
    }
  });

  // If any matching CustomCase elements were found, render them.
  if (matches.length > 0) {
    return matches;
  }

  // Otherwise render the default fallback children.
  return defaultMatches;
};

// Example component using CustomSwitch, CustomCase, and DefaultCase.
export function SwitchCaseComponent() {
  return (
    <div>
      <CustomSwitch value="20">
        {/* Predicate case: matches when parseInt(e, 10) > 10 */}
        <CustomCase value={(e: string) => parseInt(e, 10) >= 100}>Hello 100</CustomCase>
        {/* Literal cases: only match exact equality */}
        <CustomCase value="20">Hello 20</CustomCase>
        <CustomCase value="30">Hello 30</CustomCase>
        <CustomCase value="10">Hello 10</CustomCase>
        {/* Fallback default content if no case matches */}
        <DefaultCase>Default 40</DefaultCase>
      </CustomSwitch>
    </div>
  );
}

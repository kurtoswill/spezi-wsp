import { VerticalProgress } from "./ui/vertical-progress";

interface StepData {
  step: number;
  text: string;
  image: string;
}

interface InstructionStepsProps {
  stepProgress: number;
  currentStep: number;
  handleStepClick: (step: number) => void;
  StepDataSet: StepData[];
}

export const InstructionSteps = ({
  stepProgress,
  currentStep,
  handleStepClick,
  StepDataSet,
}: InstructionStepsProps) => {
  return (
    <div className="grid grid-row-7 gap-3">
      {StepDataSet.map((stepData) => {
        const isActive = stepData.step === currentStep;
        const progressValue = isActive ? stepProgress : 0;

        return (
          <div
            key={stepData.step}
            className={`transition-all duration-200 ease-in flex gap-6 items-center ${
              isActive ? `row-span-5` : `row-span-1`
            }`}
          >
            <VerticalProgress
              value={progressValue}
              className="transition-all duration-200 ease-in"
            />
            <div
              onClick={() => handleStepClick(stepData.step)}
              className={`transition-all duration-200 ease-in  ${
                isActive ? `font-extrabold` : `font-light`
              } hover:cursor-pointer`}
            >
              {stepData.text}
            </div>
          </div>
        );
      })}
    </div>
  );
};

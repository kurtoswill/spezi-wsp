import Image from "next/image";

interface StepData {
  step: number;
  text: string;
  image: string;
}

interface InstructionsImageProps {
  currentStep: number;
  StepDataSet: StepData[];
}

export const InstructionsImage = ({
  currentStep,
  StepDataSet,
}: InstructionsImageProps) => {
  return (
    <div className="relative w-full max-w-[400px] h-[250px] sm:max-w-[480px] sm:h-[300px] md:max-w-[550px] md:h-[340px] lg:w-[600px] lg:h-[380px] xl:w-[650px] xl:h-[400px] rounded-[10px] shadow-xl flex-shrink-0 overflow-hidden">
      {StepDataSet.map((stepData) => (
        <Image
          key={stepData.step}
          src={stepData.image}
          fill
          sizes="(max-width: 640px) 400px, (max-width: 768px) 480px, (max-width: 1024px) 550px, (max-width: 1280px) 600px, 650px"
          className={`absolute inset-0 object-cover transition-opacity duration-500 ease-in ${
            stepData.step === currentStep ? "opacity-100" : "opacity-0"
          }`}
          alt={`Step ${stepData.step}`}
          unoptimized
        />
      ))}
    </div>
  );
};
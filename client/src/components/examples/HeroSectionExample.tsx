import HeroSection from "../HeroSection";

export default function HeroSectionExample() {
  return (
    <HeroSection
      onContactClick={() => console.log("Contact clicked")}
      onSuccessStoriesClick={() => console.log("Success stories clicked")}
    />
  );
}

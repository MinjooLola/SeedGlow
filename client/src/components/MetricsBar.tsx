import { useEffect, useState } from "react";
import { TrendingUp, Users, Award, Briefcase } from "lucide-react";

interface Metric {
  value: number;
  suffix: string;
  label: string;
  icon: typeof TrendingUp;
}

const metrics: Metric[] = [
  { value: 300, suffix: "+", label: "컨설팅 스타트업", icon: Users },
  { value: 26, suffix: "팀", label: "투자 유치 성공", icon: TrendingUp },
  { value: 50, suffix: "억+", label: "누적 투자 유치액", icon: Briefcase },
  { value: 8, suffix: "년", label: "업계 경험", icon: Award },
];

function AnimatedCounter({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
      {count}
      {suffix}
    </span>
  );
}

export default function MetricsBar() {
  return (
    <section className="py-12 md:py-16 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="text-center"
              data-testid={`metric-${index}`}
            >
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-primary/10">
                  <metric.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
              </div>
              <AnimatedCounter target={metric.value} suffix={metric.suffix} />
              <p className="text-sm md:text-base text-muted-foreground mt-2">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

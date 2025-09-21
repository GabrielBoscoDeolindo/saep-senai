import { Rabbit, Turtle, Cat } from "lucide-react";

const priorityBadgeConfig = {
  low: { text: "baixa", class: "bg-[#0d542b] text-[#62cd8b]", icon: <Turtle size={16} /> },
  mid: { text: "média", class: "bg-[#1c398e] text-[#72a2e3]", icon: <Cat size={16} /> },
  high: { text: "alta", class: "bg-[#82181a] text-[#e08080]", icon: <Rabbit size={16} /> },
};

const PriorityBadge = ({ level }) => {
  const badge = priorityBadgeConfig[level];

  return (
    <span className={`w-[5rem] flex items-center gap-1 text-[0.75rem] px-2 py-1 rounded-full ${badge.class}`}>
      {badge.icon}
      {badge.text}
    </span>
  );
};

export default PriorityBadge;


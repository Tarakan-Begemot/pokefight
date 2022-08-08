const typesBG = (type) => {
  switch (type) {
    case 'Bug':
      return 'bg-green-500';
    case 'Dark':
      return 'bg-slate-500';
    case 'Dragon':
      return 'bg-orange-500';
    case 'Electric':
      return 'bg-purple-500';
    case 'Fairy':
      return 'bg-pink-500';
    case 'Fighting':
      return 'bg-green-700';
    case 'Fire':
      return 'bg-red-500';
    case 'Flying':
      return 'bg-sky-500';
    case 'Ghost':
      return 'bg-cyan-300';
    case 'Grass':
      return 'bg-green-700';
    case 'Ground':
      return 'bg-stone-700';
    case 'Ice':
      return 'bg-blue-400';
    case 'Normal':
      return 'bg-gray-100';
    case 'Poison':
      return 'bg-emerald-500';
    case 'Psychic':
      return 'bg-gray-500';
    case 'Rock':
      return 'bg-stone-500';
    case 'Steel':
      return 'bg-zinc-500';
    case 'Water':
      return 'bg-blue-500';
    // break;
    default:
      return 'bg-black';
  }
};

export default typesBG;

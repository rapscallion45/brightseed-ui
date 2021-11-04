import Image from 'next/image';

export default function Avatar({ author }) {
  const name = author?.firstName && author?.lastName
    ? `${author.firstName} ${author.lastName}`
    : author.name;

  return (
    <div className="flex items-center">
      <div className="w-12 h-12 relative mr-4">
        <Image
          src={author.avatar.url}
          layout="fill"
          className="rounded-full"
          alt={name}
        />
      </div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
}

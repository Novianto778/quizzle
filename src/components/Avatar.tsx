import { cn } from '../lib/utils';

type AvatarProps = {
    image: string;
    className?: string;
};

const Avatar = ({ image, className }: AvatarProps) => {
    return (
        <div
            className={cn(
                'w-12 h-12 rounded-full overflow-hidden border',
                className
            )}
        >
            <img src={image} alt="" />
        </div>
    );
};

export default Avatar;

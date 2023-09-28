import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import useCategories from '@/hooks/useCategories';
import { cn } from '@/lib/utils';

const Home = () => {
    const { categories, isLoading } = useCategories();

    return (
        <div>
            <section className="container grid grid-cols-12 gap-8 items-center min-h-screen">
                <div className="col-span-12 md:col-span-7">
                    <h1 className="text-6xl font-bold leading-normal">
                        Test Your Skills in the Ultimate Quiz Challenge
                    </h1>
                    <p className="text-2xl font-medium text-body">
                        From Novice to Virtuoso, Every Question Awaits Your
                        Answer.
                    </p>
                    <Button variant="secondary" className="mt-8 text-lg">
                        <Link to="/quiz">Start Now</Link>
                    </Button>
                </div>
                <div className="col-span-12 md:col-span-5">
                    <img src="/screen.png" alt="screen" />
                </div>
            </section>
            <section className="container p-12 bg-primary rounded my-12">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 items-center justify-between h-full justify-items-start md:justify-items-end">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-5xl text-white font-medium">
                            Why Quizzle?
                        </h2>
                        <p className="text-lg text-body-light">
                            Don't miss out on the fun and learning that Quizzle
                            has to offer. Join our vibrant community today and
                            let the quest for knowledge begin!
                        </p>
                    </div>
                    <div className="flex flex-col gap-8">
                        <div className="flex gap-4 text-white">
                            <div className="relative bg-secondary w-10 h-10 rotate-45 flex items-center justify-center rounded-lg">
                                <p className="-rotate-45 text-black text-lg font-bold">
                                    1
                                </p>
                            </div>
                            <p className="text-3xl">18000+ Questions</p>
                        </div>
                        <div className="flex gap-4 text-white">
                            <div className="relative bg-secondary w-10 h-10 rotate-45 flex items-center justify-center rounded-lg">
                                <p className="-rotate-45 text-black text-lg font-bold">
                                    2
                                </p>
                            </div>
                            <p className="text-3xl">20+ Categories</p>
                        </div>
                        <div className="flex gap-4 text-white">
                            <div className="relative bg-secondary w-10 h-10 rotate-45 flex items-center justify-center rounded-lg">
                                <p className="-rotate-45 text-black text-lg font-bold">
                                    3
                                </p>
                            </div>
                            <p className="text-3xl">Various Difficulity</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container py-12">
                <h2 className="text-5xl font-medium">Trivia Category</h2>
                <div className="grid grid-cols-12 gap-4 mt-8">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        categories.slice(0, 7).map((category, index) => {
                            let categoryName = category.name;
                            if (category.name.includes('Entertainment:')) {
                                categoryName = category.name.replace(
                                    'Entertainment:',
                                    ''
                                );
                            }

                            let cardClass;

                            if (index <= 3) {
                                cardClass =
                                    index % 2 === 0
                                        ? 'bg-primary text-white'
                                        : 'bg-secondary text-black';
                            } else {
                                cardClass =
                                    index % 2 === 0
                                        ? 'bg-secondary text-black'
                                        : 'bg-primary text-white';
                            }

                            return (
                                <div
                                    key={category.id}
                                    className={cn(
                                        'col-span-6 sm:col-span-4 md:col-span-3 p-8 rounded items-center justify-center flex',
                                        cardClass
                                    )}
                                >
                                    <p>{categoryName}</p>
                                </div>
                            );
                        })
                    )}
                    <div className="bg-primary text-white col-span-6 sm:col-span-4 md:col-span-3 p-8 rounded items-center justify-center flex">
                        <p className="text-xl font-medium">And More...</p>
                    </div>
                </div>
            </section>
            <section className="container p-12 bg-secondary rounded my-12">
                <div className="grid grid-cols-12 items-center justify-between h-full">
                    <div className="flex flex-col col-span-12 md:col-span-7 gap-4">
                        <h2 className="text-5xl font-medium">
                            Ready to Test Your Smarts?
                        </h2>
                        <p className="text-lg text-body">
                            Join Quizzle Now and Dive into a World of Trivia
                            Adventure!
                        </p>
                        <Button
                            variant="primary"
                            className="mt-8 text-lg max-w-max px-12 py-6"
                            asChild
                        >
                            <Link to="/quiz">Start Now</Link>
                        </Button>
                    </div>
                    <div className="relative w-full h-full hidden md:block col-span-5">
                        <img
                            src="/task.png"
                            alt="task"
                            className="w-96 h-96 absolute right-0 -top-24"
                        />
                    </div>
                </div>
            </section>
            <footer>
                <div className="container py-8">
                    <p className="text-sm text-body uppercase my-4">
                        Follow Us
                    </p>
                    <div className="flex gap-4 items-center">
                        <Facebook />
                        <Instagram />
                        <Twitter />
                        <Linkedin />
                    </div>
                    <div className="grid grid-cols-12 mt-12 gap-8">
                        <div className="grid grid-cols-12 col-span-12 md:col-span-6 gap-6">
                            <div className="flex flex-col col-span-12 sm:col-span-4 gap-6">
                                <p>About Quizzle</p>
                                <p>Get In Touch</p>
                                <p>Things We Like</p>
                            </div>
                            <div className="flex flex-col col-span-12 sm:col-span-4 gap-6">
                                <p>Privacy Policy</p>
                                <p>Terms of Service</p>
                            </div>
                            <div className="flex flex-col col-span-12 sm:col-span-4 gap-6">
                                <p>We Are Hiring</p>
                                <p>Resources</p>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <div className="flex flex-col gap-4">
                                <img src="/logo.png" alt="" width={150} />
                                <p className="text-[#735FDB]">
                                    Quizzle, where curiosity meets
                                    entertainment! Quizzle is not just another
                                    quiz platform; it's your portal to a world
                                    of knowledge, challenge, and fun
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <img src="/wave.png" alt="" />
            </footer>
        </div>
    );
};

export default Home;

import React from 'react';
import food_logo from '../assets/images/10_food.png'
import managging_stress from '../assets/images/mangging_stress.png'


const blogPosts = [
    {
        // image: 'https://images.unsplash.com/photo-1599688663523-a579133844a4?q=80&w=2070&auto=format&fit=crop',
        image: food_logo,
        category: 'Nutrition',
        title: 'Top 10 Foods to Boost Fertility Naturally',
        excerpt: 'Discover the essential nutrients and foods that can help improve your chances of conception and support a healthy pregnancy.'
    },
    {
        // image: 'https://images.unsplash.com/photo-1554236376-35a34dc517a4?q=80&w=2070&auto=format&fit=crop',
        image: managging_stress,
        category: 'Wellness',
        title: 'Managing Stress During Your Pregnancy Journey',
        excerpt: 'Learn effective techniques and lifestyle changes to reduce stress and promote well-being for a smoother journey to parenthood.'
    },
    {
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
        category: 'Medical Insights',
        title: 'Understanding IVF: What to Expect in Your First Cycle',
        excerpt: 'A comprehensive guide to the IVF process, from initial consultations to the two-week wait, to help you feel prepared and informed.'
    }
];

const BlogCard = ({ image, category, title, excerpt }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
        <img className="h-48 w-full object-cover" src={image} alt={title} />
        <div className="p-6 flex flex-col flex-grow">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">{category}</p>
            <h3 className="mt-2 text-xl font-bold text-slate-800 leading-tight flex-grow">{title}</h3>
            <p className="mt-2 text-slate-600 text-base">{excerpt}</p>
            <a href="#" className="mt-4 text-indigo-600 font-semibold hover:underline">Read More &rarr;</a>
        </div>
    </div>
);

const Blogs = () => {
    return (
        <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                     <h2 className="text-3xl font-bold text-slate-800">Latest Blogs</h2>
                     <p className="mt-2 text-lg text-slate-600">Insights and advice to guide you on your journey.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <BlogCard key={index} {...post} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blogs;

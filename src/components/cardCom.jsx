import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct, updateProduct } from '../slice/fetchCards';
import { addProduct } from '../slice/postCards';

const CardCom = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);
    const status = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);

    const [newProduct, setNewProduct] = useState({
        img: '',
        title: '',
        description: '',
        cost: '',
        storage: ''
    });

    const [isEditing, setIsEditing] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts()); // Загружаем продукты при первом рендере
        }
    }, [status, dispatch]);

    // Обработчик изменения input
    const handleChange = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value,
        });
    };

    // Обработчик отправки формы
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            dispatch(updateProduct({ ...newProduct, id: currentProductId }));
            setIsEditing(false);
            setCurrentProductId(null);
        } else {
            dispatch(addProduct(newProduct));
        }

        // Сброс формы после отправки
        setNewProduct({
            img: '',
            title: '',
            description: '',
            cost: '',
            storage: ''
        });
    };

    // Удаление продукта
    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };

    // Редактирование продукта
    const handleEdit = (product) => {
        setIsEditing(true);
        setCurrentProductId(product.id);
        setNewProduct({
            img: product.img,
            title: product.title,
            description: product.description,
            cost: product.cost,
            storage: product.storage,
        });
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>{error}</div>;
    }

    return (
        <div>
            <div className='py-[50px]'>
                <form className='bg-cyan-800 size-full px-[100px] py-[20px] rounded-[30px] flex justify-between' onSubmit={handleSubmit}>
                    <input
                        className='pl-[10px] rounded-[10px]'
                        type="text"
                        name="img"
                        value={newProduct.img}
                        onChange={handleChange}
                        placeholder="Image URL"
                    />
                    <input
                        className='pl-[10px] rounded-[10px]'
                        type="text"
                        name="title"
                        value={newProduct.title}
                        onChange={handleChange}
                        placeholder="Title"
                    />
                    <input
                        className='pl-[10px] rounded-[10px]'
                        type="text"
                        name="description"
                        value={newProduct.description}
                        onChange={handleChange}
                        placeholder="Description"
                    />
                    <input
                        className='pl-[10px] rounded-[10px]'
                        type="text"
                        name="cost"
                        value={newProduct.cost}
                        onChange={handleChange}
                        placeholder="Price"
                    />
                    <input
                        className='pl-[10px] rounded-[10px]'
                        type="text"
                        name="storage"
                        value={newProduct.storage}
                        onChange={handleChange}
                        placeholder="Storage"
                    />
                    <button className='bg-white rounded-[10px] px-[5px]' type="submit">{isEditing ? 'Update' : 'Add'}</button>
                </form>
            </div>
            <h1 className='text-[50px] text-center'>Cards</h1>
            <div className='px-[50px] flex gap-[20px]'>
                {products.map((product) => (
                    <div className='border-[2px] py-[10px] px-[20px] w-[250px] flex flex-col' key={product.id}>
                        <img className='size-full' src={product.img} alt={product.title} width="100" />
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p>Price: {product.cost}</p>
                        <p>Storage: {product.storage}</p>
                        <button className='rounded-[10px] border-[2px] px-[6px]' onClick={() => handleEdit(product)}>Edit</button>
                        <button className='rounded-[10px] border-[2px] px-[6px]' onClick={() => handleDelete(product.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardCom;

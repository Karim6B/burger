import React, { useEffect, useState } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, setError] = useState(null);
        let reqInterceptor = null;
        let resInterceptor = null;
        useEffect(() => {
            reqInterceptor = axios.interceptors.request.use((request) => {
                setError(null);
                return request;
            });

            resInterceptor = axios.interceptors.response.use(
                (response) => response,
                (error) => {
                    setError(error);
                }
            );

            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            };
        }, []);

        const closeModalHandler = () => {
            setError(null);
        };
        return (
            <>
                <Modal show={error} modalClosed={closeModalHandler}>
                    <p>{error ? error.message : null}</p>
                </Modal>
                <WrappedComponent {...props} />
            </>
        );
    };
};

export default withErrorHandler;

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
// import { Loading } from '@/components/loading';

interface TitleFormProps {
    initialData: {
        nombre: string;
    };
    courseId: number;
}

const formSchema = z.object({
    nombre: z.string().min(1, {
        message: 'Title is required',
    }),
});

const TitleForm: FC<TitleFormProps> = ({ courseId, initialData }) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const toggleEdit = () => {
        console.log('click')
        setIsEditing((prev) => !prev)
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/curso/${courseId}`, values);
            // toast.success('Course updated');
            // toggleEdit();
            // router.refresh();
        } catch {
            // toast.error('Something went wrong');
        }
    };

    return (
        <div className="p-4 mt-6 border rounded-md bg-slate-100">
            <div className="flex items-center justify-between font-medium">
                Nombre del curso
                <Button variant="ghost" type="button" onClick={toggleEdit}>
                    {isEditing ? (
                        'Cancel'
                    ) : (
                        <>
                            <Pencil className="w-4 h-4 mr-2" />
                            Editar
                        </>
                    )}
                </Button>
            </div>
            {isEditing ? (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="mt-4 space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="nombre"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Advanced web development'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button disabled={!isValid || isSubmitting} type="submit">
                                {isSubmitting && <div>Cargando</div>}
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            ) : (
                <p className="mt-2 text-sm">{initialData.nombre}</p>
            )}
        </div>
    );
};

export { TitleForm };
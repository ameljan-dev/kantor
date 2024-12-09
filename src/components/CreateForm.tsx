import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { storageData } from '../middleware/storageData';
import { useMachine } from '@xstate/react';
import { StyledBox, StyledButton, StyledContainer } from '../stylesheet/StyleContext';

const CreateForm: React.FC = () => {
  const [, send] = useMachine(storageData);
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = () => {
    send({ type: 'TERMS_ACCEPT' });
    window.location.reload();
  };

  return (
    <StyledBox>
      <StyledContainer>
        <span className='pages-home-agreements'>Aby móc korzystać z serwisu <u className='red'>musisz zaakceptować regulamin</u></span>
        <form className='pages-home-rules' onSubmit={handleSubmit(onSubmit)}>
          <h3>Regulamin serwisu</h3>
          <ul>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pellentesque vel nulla in semper. Maecenas ut elementum nisi. Morbi ornare mauris vel nulla condimentum, id pretium purus molestie. Nulla vulputate auctor urna, id euismod velit ullamcorper nec. Vivamus lobortis augue risus, ac tempus quam luctus vel. Fusce non urna lorem. Vivamus a tellus turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dictum eget quam vel euismod. Aliquam feugiat scelerisque mollis. Nunc tincidunt varius orci ut mollis.</li>

            <li>Sed pharetra placerat fringilla. Morbi ac sapien id tellus posuere suscipit. Suspendisse blandit eget eros ac semper. Aenean blandit, eros in euismod hendrerit, eros nisl vulputate urna, et efficitur neque justo eget orci. Nulla faucibus semper nibh, non porttitor quam sagittis sed. Integer lacus metus, rutrum vel lectus in, ultrices consequat nisl. Praesent ultrices, lorem sit amet volutpat semper, arcu massa molestie dui, et malesuada quam nunc id est. Ut efficitur lacinia sapien vitae ultricies. Integer mollis tortor vitae iaculis tristique. Sed ultrices nisl ut diam sagittis, id interdum eros ultrices. Curabitur id molestie ex.</li>

            <li>Nullam in elementum metus. Pellentesque hendrerit accumsan porta. Ut elementum sed enim ut tristique. Aenean aliquet tortor a sodales ullamcorper. Aliquam vestibulum leo sem, et elementum lacus blandit at. In pulvinar lacus at semper dictum. Proin non lobortis purus, id venenatis nulla. Cras interdum dui at varius imperdiet.</li>

            <li>Aliquam pellentesque enim risus, vitae porta arcu imperdiet non. Cras accumsan tempus tellus ac finibus. Nulla facilisi. Integer faucibus orci quis orci feugiat, eget feugiat ex sodales. Maecenas ut congue velit, sollicitudin dapibus mi. In elit est, placerat eu ex id, rutrum pharetra sapien. Morbi blandit bibendum ex nec suscipit. Morbi et tellus ac nisi malesuada imperdiet ornare nec nunc. Morbi quis finibus felis, ac fringilla elit. Aliquam eget interdum tellus, vel pulvinar velit. Morbi nec lectus id enim vulputate pharetra. Sed nulla odio, ultricies bibendum pretium non, aliquam id magna.</li>

            <li>Fusce quis orci nec augue facilisis pharetra et in leo. Cras commodo odio id dui cursus varius. Etiam et quam dictum, facilisis velit sit amet, pharetra metus. Duis vitae laoreet nisi. Pellentesque semper risus efficitur maximus sagittis. Ut a consequat nisi. Donec eu enim dolor. Vivamus fringilla porta ex vel dictum. Aenean condimentum felis eu nisl viverra blandit. Cras lobortis ornare lorem nec viverra. Nullam luctus consectetur pretium. Ut venenatis quam vitae semper scelerisque.</li>
          </ul>
          <div>
            <Controller
              name='agreement'
              control={control}
              rules={{ required: 'Musisz zaakceptować regulamin' }}
              render={({ field }) => (
                <label>
                  <input
                    type='checkbox'
                    {...field}
                  />
                  Akceptuję regulamin
                </label>
              )}
            />
            {errors.agreement && (
              <p>{ typeof errors.agreement.message === 'string' ? errors.agreement.message : 'Musisz zaakceptować regulamin' }</p>
            )}
            <StyledButton type='submit' color='success'>
              Zaakceptuj regulamin
            </StyledButton>
          </div>
        </form>
      </StyledContainer>
    </StyledBox>
  );
};

export default CreateForm;
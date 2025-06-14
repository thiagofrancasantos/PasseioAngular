import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria.service';
import { LugarService } from '../lugar.service';

@Component({
  selector: 'app-lugar',
  templateUrl: './lugar.component.html',
  styleUrl: './lugar.component.scss'
})
export class LugarComponent implements OnInit {
  camposForm: FormGroup;
  categorias: Categoria[] = []

  constructor(
    private categoriaService: CategoriaService,
    private service: LugarService
  ) {
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      localizacao: new FormControl('', Validators.required),
      urlFoto: new FormControl('', Validators.required),
      avaliacao: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    console.log('Iniciando as categorias da api');
    this.categoriaService.obterTodas().subscribe({
      next: (listaCategorias) => {
        console.log('Categorias obtidas com sucesso', listaCategorias);
        this.categorias = listaCategorias;
      },
      error: err => console.error('Erro ao obter categorias', err)
    });
  }

  salvar(){

    this.camposForm.markAllAsTouched();

    if(this.camposForm.valid){
      this.service.salvar(this.camposForm.value)
        .subscribe({
          next: (lugar) => {
            console.log('Cadastrado com sucesso!', lugar);
            this.camposForm.reset();
          },
          error: err => console.error('Ocorreu um erro:', err)
        });
    }

  }

    isCampoIvalido(nomeCampo: string) : boolean{
    const campo = this.camposForm.get(nomeCampo);
    return campo?.invalid && campo?.touched && campo?.errors?.['required']
  }


}
